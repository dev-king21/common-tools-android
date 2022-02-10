<?php
/**
 * The control file of sonarqube module of ZenTaoPMS.
 *
 * @copyright   Copyright 2009-2022 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv12.html)
 * @author      Yanyi Cao <caoyanyi@easycorp.ltd>
 * @package     sonarqube
 * @version     $Id: ${FILE_NAME} 5144 2022/1/11 8:55 上午 caoyanyi@easycorp.ltd $
 * @link        http://www.zentao.net
 */
class sonarqube extends control
{
    /**
     * The mr constructor.
     * @param string $moduleName
     * @param string $methodName
     */
    public function __construct($moduleName = '', $methodName = '')
    {
        parent::__construct($moduleName, $methodName);

        /* This is essential when changing tab(menu) from gitlab to repo. */
        /* Optional: common::setMenuVars('devops', $this->session->repoID); */
        $this->loadModel('ci')->setMenu();
    }

    /**
     * Browse sonarqube.
     *
     * @param  string $orderBy
     * @param  int    $recTotal
     * @param  int    $recPerPage
     * @param  int    $pageID
     * @access public
     * @return void
     */
    public function browse($orderBy = 'id_desc', $recTotal = 0, $recPerPage = 20, $pageID = 1)
    {
        $this->app->loadClass('pager', $static = true);
        $pager = new pager($recTotal, $recPerPage, $pageID);

        $sonarqubeList = $this->loadModel('pipeline')->getList('sonarqube', $orderBy, $pager);

        $this->view->title         = $this->lang->sonarqube->common . $this->lang->colon . $this->lang->sonarqube->browse;
        $this->view->sonarqubeList = $sonarqubeList;
        $this->view->orderBy       = $orderBy;
        $this->view->pager         = $pager;

        $this->display();
    }

    /**
     * Show sonarqube report.
     *
     * @param  int    $jobID
     * @access public
     * @return void
     */
    public function reportView($jobID)
    {
        $job         = $this->loadModel('job')->getByID($jobID);
        $qualitygate = $this->sonarqube->apiGetQualitygate($job->sonarqubeServer, $job->projectKey);
        $report      = $this->sonarqube->apiGetReport($job->sonarqubeServer, $job->projectKey);
        $measures    = array();
        if(isset($report->component->measures))
        {
            foreach($report->component->measures as $measure)
            {
                if(in_array($measure->metric, array('security_hotspots_reviewed', 'coverage', 'duplicated_lines_density')))
                {
                    $measures[$measure->metric] = $measure->value . '%';
                }
                else
                {
                    $measures[$measure->metric] = $measure->value;
                    if($measure->value > 1000) $measures[$measure->metric] = round($measure->value / 1000, 1) . 'K';
                }
            }
        }

        $projectName = $job->projectKey;
        $projects    = $this->sonarqube->apiGetProjects($job->sonarqubeServer, '', $job->projectKey);
        if(isset($projects[0]->name)) $projectName = $projects[0]->name;

        $this->view->measures    = $measures;
        $this->view->qualitygate = $qualitygate;
        $this->view->projectName = $projectName;

        $this->display();
    }

    /**
     * Ajax get project select.
     *
     * @param  int    $sonarqubeID
     * @param  string $projectKey
     * @access public
     * @return void
     */
    public function ajaxGetProjectList($sonarqubeID, $projectKey = '')
    {
        $jobPairs      = $this->loadModel('job')->getJobBySonarqubeProject($sonarqubeID, array(), true, true);
        $existsProject = array_diff(array_keys($jobPairs), array($projectKey));

        $projectList = $this->sonarqube->apiGetProjects($sonarqubeID);

        $projectPairs = array('' => '');
        foreach($projectList as $project)
        {
            if(!empty($project) and !in_array($project->key, $existsProject)) $projectPairs[$project->key] = $project->name;
        }

        echo html::select('projectKey', $projectPairs, str_replace('*', '-', $projectKey), "class='form-control chosen'");
    }

    /**
     * create a sonarqube.
     *
     * @access public
     * @return void
     */
    public function create()
    {
        if($_POST)
        {
            $this->checkToken();
            $sonarqubeID = $this->loadModel('pipeline')->create('sonarqube');

            if(dao::isError()) return $this->send(array('result' => 'fail', 'message' => dao::getError()));
            $actionID = $this->loadModel('action')->create('sonarqube', $sonarqubeID, 'created');
            return $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        $this->view->title = $this->lang->sonarqube->common . $this->lang->colon . $this->lang->sonarqube->createServer;

        $this->display();
    }

    /**
     * Check post info.
     *
     * @param  int    $sonarqubeID
     * @access protected
     * @return void
     */
    protected function checkToken($sonarqubeID = 0)
    {
        $sonarqube = fixer::input('post')->trim('url,token,account,password')->get();
        $this->dao->update('sonarqube')->data($sonarqube)
            ->batchCheck(empty($sonarqubeID) ? $this->config->sonarqube->create->requiredFields : $this->config->sonarqube->edit->requiredFields, 'notempty')
            ->batchCheck("url", 'URL');
        if(dao::isError()) return $this->send(array('result' => 'fail', 'message' => dao::getError()));
        if(strpos($sonarqube->url, 'http') !== 0) return $this->send(array('result' => 'fail', 'message' => array('url' => array($this->lang->sonarqube->hostError))));

        /* Check name and url unique. */
        $existSonarQube = $this->dao->select('*')->from(TABLE_PIPELINE)
            ->where("type='sonarqube' and (name='{$sonarqube->name}' or url='{$sonarqube->url}')")
            ->andWhere('deleted')->eq('0')
            ->beginIF(!empty($sonarqubeID))->andWhere('id')->ne($sonarqubeID)->fi()
            ->fetch();
        if(isset($existSonarQube->name) and $existSonarQube->name == $sonarqube->name) return $this->send(array('result' => 'fail', 'message' => $this->lang->sonarqube->nameRepeatError));
        if(isset($existSonarQube->url) and $existSonarQube->url == $sonarqube->url) return $this->send(array('result' => 'fail', 'message' => $this->lang->sonarqube->urlRepeatError));

        $token  = base64_encode("{$sonarqube->account}:{$sonarqube->password}");
        $result = $this->sonarqube->apiValidate($sonarqube->url, $token);

        if(!isset($result->valid) or !$result->valid) return $this->send(array('result' => 'fail', 'message' => array('token' => array($this->lang->sonarqube->validError))));
        $this->post->set('token', $token);
    }

    /**
     * Edit a sonarqube.
     *
     * @param  int    $sonarqubeID
     * @access public
     * @return void
     */
    public function edit($sonarqubeID)
    {
        $oldSonarQube = $this->loadModel('pipeline')->getByID($sonarqubeID);

        if($_POST)
        {
            $this->checkToken($sonarqubeID);
            $this->pipeline->update($sonarqubeID);
            $sonarqube = $this->pipeline->getByID($sonarqubeID);
            if(dao::isError()) return $this->send(array('result' => 'fail', 'message' => dao::getError()));

            $this->loadModel('action');
            $actionID = $this->action->create('sonarqube', $sonarqubeID, 'edited');
            $changes  = common::createChanges($oldSonarQube, $sonarqube);
            $this->action->logHistory($actionID, $changes);
            return $this->send(array('result' => 'success', 'message' => $this->lang->saveSuccess, 'locate' => inlink('browse')));
        }

        $this->view->title     = $this->lang->sonarqube->common . $this->lang->colon . $this->lang->sonarqube->editServer;
        $this->view->sonarqube = $oldSonarQube;

        $this->display();
    }

    /**
     * Delete a sonarqube.
     *
     * @param  int    $sonarqubeID
     * @access public
     * @return void
     */
    public function delete($sonarqubeID, $confirm = 'no')
    {
        if($confirm != 'yes') die(js::confirm($this->lang->sonarqube->confirmDelete, inlink('delete', "sonarqubeID=$sonarqubeID&confirm=yes")));

        $oldSonarQube = $this->loadModel('pipeline')->getByID($sonarqubeID);
        $this->loadModel('action');
        $actionID = $this->pipeline->delete($sonarqubeID, 'sonarqube');

        $sonarQube = $this->pipeline->getByID($sonarqubeID);
        $changes   = common::createChanges($oldSonarQube, $sonarQube);
        $this->action->logHistory($actionID, $changes);
        echo js::reload('parent');
    }

    /**
     * Exec job.
     *
     * @param  int    $jobID
     * @access public
     * @return void
     */
    public function execJob($jobID)
    {
        echo $this->fetch('job', 'exec', "jobID=$jobID");
    }

    /**
     * Browse sonarqube project.
     *
     * @param  int    $sonarqubeID
     * @param  string $orderBy
     * @param  int    $recTotal
     * @param  int    $recPerPage
     * @param  int    $pageID
     * @access public
     * @return void
     */
    public function browseProject($sonarqubeID, $orderBy = 'name_desc', $recTotal = 0, $recPerPage = 15, $pageID = 1)
    {
        $this->app->loadClass('pager', $static = true);
        $keyword = fixer::input('post')->setDefault('keyword', '')->get('keyword');

        $sonarqubeProjectList = $this->sonarqube->apiGetProjects($sonarqubeID, $keyword);
        $projectKeyList       = array();
        foreach($sonarqubeProjectList as $key => $sonarqubeProject)
        {
            if(!isset($sonarqubeProject->lastAnalysisDate)) $sonarqubeProject->lastAnalysisDate = '';
            $projectKeyList[] = $sonarqubeProject->key;
        }

         /* Data sort. */
        list($order, $sort) = explode('_', $orderBy);
        $orderList = array();
        foreach($sonarqubeProjectList as $sonarqubeProject) $orderList[] = $sonarqubeProject->$order;
        array_multisort($orderList, $sort == 'desc' ? SORT_DESC : SORT_ASC, $sonarqubeProjectList);

        /* Pager. */
        $this->app->loadClass('pager', $static = true);
        $recTotal = count($sonarqubeProjectList);
        $pager    = new pager($recTotal, $recPerPage, $pageID);
        $sonarqubeProjectList = array_chunk($sonarqubeProjectList, $pager->recPerPage);

        $this->view->sonarqube            = $this->loadModel('pipeline')->getByID($sonarqubeID);
        $this->view->keyword              = urldecode(urldecode($keyword));
        $this->view->pager                = $pager;
        $this->view->title                = $this->lang->sonarqube->common . $this->lang->colon . $this->lang->sonarqube->browseProject;
        $this->view->sonarqubeID          = $sonarqubeID;
        $this->view->sonarqubeProjectList = (empty($sonarqubeProjectList) or empty($sonarqubeProjectList[$pageID - 1])) ? array() : $sonarqubeProjectList[$pageID - 1];
        $this->view->projectJobPairs      = $this->loadModel('job')->getJobBySonarqubeProject($sonarqubeID, $projectKeyList);
        $this->view->orderBy              = $orderBy;
        $this->display();
    }

    /**
     * Delete project.
     *
     * @param  int    $sonarqubeID
     * @param  string $projectKey
     * @param  string $confirm
     * @access public
     * @return void
     */
    public function deleteProject($sonarqubeID, $projectKey, $confirm = 'no')
    {
        if($confirm != 'yes') die(js::confirm($this->lang->sonarqube->confirmDeleteProject, inlink('deleteProject', "sonarqubeID=$sonarqubeID&projectKey=$projectKey&confirm=yes")));

        /* Fix error when request type is PATH_INFO and the tag name contains '-'.*/
        $projectKey = str_replace('*', '-', $projectKey);
        $reponse    = $this->sonarqube->apiDeleteProject($sonarqubeID, $projectKey);

        if(isset($reponse->errors)) return print(js::alert($reponse->errors[0]->msg));

        $this->loadModel('action')->create('sonarqubeproject', 0, 'deleted', '', $projectKey);
        return print(js::reload('parent'));
    }
}
