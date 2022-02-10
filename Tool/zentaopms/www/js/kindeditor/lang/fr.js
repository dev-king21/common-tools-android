/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.lang({
	source : 'Source',
	preview : 'Preview',
	undo : 'Undo(Ctrl+Z)',
	redo : 'Redo(Ctrl+Y)',
	cut : 'Cut(Ctrl+X)',
	copy : 'Copy(Ctrl+C)',
	paste : 'Paste(Ctrl+V)',
	plainpaste : 'Paste as plain text',
	wordpaste : 'Paste from Word',
	selectall : 'Select all',
	justifyleft : 'Align left',
	justifycenter : 'Align center',
	justifyright : 'Align right',
	justifyfull : 'Align full',
	insertorderedlist : 'Ordered list',
	insertunorderedlist : 'Unordered list',
	indent : 'Increase indent',
	outdent : 'Decrease indent',
	subscript : 'Subscript',
	superscript : 'Superscript',
	formatblock : 'Paragraph format',
	fontname : 'Font family',
	fontsize : 'Font size',
	forecolor : 'Text color',
	hilitecolor : 'Highlight color',
	bold : 'Bold(Ctrl+B)',
	italic : 'Italic(Ctrl+I)',
	underline : 'Underline(Ctrl+U)',
	strikethrough : 'Strikethrough',
	removeformat : 'Remove format',
	image : 'Image',
	multiimage : 'Multi image',
	flash : 'Flash',
	media : 'Embeded media',
	table : 'Table',
	tablecell : 'Cell',
	hr : 'Insert horizontal line',
	emoticons : 'Insert emoticon',
	link : 'Link',
	unlink : 'Unlink',
	fullscreen : 'Toggle fullscreen mode',
	about : 'About',
	print : 'Print',
	filemanager : 'File Manager',
	code : 'Insert code',
	map : 'Google Maps',
	baidumap : 'Baidu Maps',
	lineheight : 'Line height',
	clearhtml : 'Clear HTML code',
	pagebreak : 'Insert Page Break',
	quickformat : 'Quick Format',
	insertfile : 'Insert file',
	template : 'Insert Template',
	anchor : 'Anchor',
	yes : 'OK',
	no : 'Cancel',
	close : 'Close',
	editImage : 'Image properties',
	deleteImage : 'Delete image',
	editFlash : 'Flash properties',
	deleteFlash : 'Delete flash',
	editMedia : 'Media properties',
	deleteMedia : 'Delete media',
	editLink : 'Link properties',
	deleteLink : 'Unlink',
	tableprop : 'Table properties',
	tablecellprop : 'Cell properties',
	tableinsert : 'Insert table',
	tabledelete : 'Delete table',
	tablecolinsertleft : 'Insert column left',
	tablecolinsertright : 'Insert column right',
	tablerowinsertabove : 'Insert row above',
	tablerowinsertbelow : 'Insert row below',
	tablerowmerge : 'Merge down',
	tablecolmerge : 'Merge right',
	tablerowsplit : 'Split row',
	tablecolsplit : 'Split column',
	tablecoldelete : 'Delete column',
	tablerowdelete : 'Delete row',
	noColor : 'Default',
	pleaseSelectFile : 'Please select file.',
	invalidImg : "Please type valid URL.\nAllowed file extension: jpg,gif,bmp,png",
	invalidMedia : "Please type valid URL.\nAllowed file extension: swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb",
	invalidWidth : "The width must be number.",
	invalidHeight : "The height must be number.",
	invalidBorder : "The border must be number.",
	invalidUrl : "Please type valid URL.",
	invalidRows : 'Invalid rows.',
	invalidCols : 'Invalid columns.',
	invalidPadding : 'The padding must be number.',
	invalidSpacing : 'The spacing must be number.',
	invalidJson : 'Invalid JSON string.',
	uploadSuccess : 'Upload success.',
	cutError : 'Currently not supported by your browser, use keyboard shortcut(Ctrl+X) instead.',
	copyError : 'Currently not supported by your browser, use keyboard shortcut(Ctrl+C) instead.',
	pasteError : 'Currently not supported by your browser, use keyboard shortcut(Ctrl+V) instead.',
	ajaxLoading : 'Loading ...',
	uploadLoading : 'Uploading ...',
	uploadError : 'Upload Error',
	'plainpaste.comment' : 'Use keyboard shortcut(Ctrl+V) to paste the text into the window.',
	'wordpaste.comment' : 'Use keyboard shortcut(Ctrl+V) to paste the text into the window.',
	'code.pleaseInput' : 'Please input code.',
	'link.url' : 'URL',
	'link.linkType' : 'Target',
	'link.newWindow' : 'New window',
	'link.selfWindow' : 'Same window',
	'flash.url' : 'URL',
	'flash.width' : 'Width',
	'flash.height' : 'Height',
	'flash.upload' : 'Upload',
	'flash.viewServer' : 'Browse',
    'media.url' : 'URL',
    'media.urlTip': 'Multiple URLs are separated by commas',
	'media.width' : 'Width',
	'media.height' : 'Height',
	'media.autostart' : 'Auto start',
	'media.upload' : 'Upload',
    'media.viewServer' : 'Browse',
    'media.controls': 'Play controls',
	'image.remoteImage' : 'Insert URL',
	'image.localImage' : 'Upload',
	'image.remoteUrl' : 'URL',
	'image.localUrl' : 'File',
	'image.size' : 'Size',
	'image.width' : 'Width',
	'image.height' : 'Height',
	'image.resetSize' : 'Reset dimensions',
	'image.align' : 'Align',
	'image.defaultAlign' : 'Default',
	'image.leftAlign' : 'Left',
	'image.rightAlign' : 'Right',
	'image.imgTitle' : 'Title',
	'image.upload' : 'Browse',
	'image.viewServer' : 'Browse',
	'multiimage.uploadDesc' : 'Allows users to upload <%=uploadLimit%> images, single image size not exceeding <%=sizeLimit%>',
	'multiimage.startUpload' : 'Start upload',
	'multiimage.clearAll' : 'Clear all',
	'multiimage.insertAll' : 'Insert all',
	'multiimage.queueLimitExceeded' : 'Queue limit exceeded.',
	'multiimage.fileExceedsSizeLimit' : 'File exceeds size limit.',
	'multiimage.zeroByteFile' : 'Zero byte file.',
	'multiimage.invalidFiletype' : 'Invalid file type.',
	'multiimage.unknownError' : 'Unknown upload error.',
	'multiimage.pending' : 'Pending ...',
	'multiimage.uploadError' : 'Upload error',
	'filemanager.emptyFolder' : 'Blank',
	'filemanager.moveup' : 'Parent folder',
	'filemanager.viewType' : 'Display: ',
	'filemanager.viewImage' : 'Thumbnails',
	'filemanager.listImage' : 'List',
	'filemanager.orderType' : 'Sorting: ',
	'filemanager.fileName' : 'By name',
	'filemanager.fileSize' : 'By size',
	'filemanager.fileType' : 'By type',
	'insertfile.url' : 'URL',
	'insertfile.title' : 'Title',
	'insertfile.upload' : 'Upload',
	'insertfile.viewServer' : 'Browse',
	'table.cells' : 'Cells',
	'table.rows' : 'Rows',
	'table.cols' : 'Columns',
	'table.size' : 'Dimensions',
	'table.width' : 'Width',
	'table.height' : 'Height',
	'table.percent' : '%',
	'table.px' : 'px',
	'table.space' : 'Space',
	'table.padding' : 'Padding',
	'table.spacing' : 'Spacing',
	'table.align' : 'Align',
	'table.textAlign' : 'Horizontal',
	'table.verticalAlign' : 'Vertical',
	'table.alignDefault' : 'Default',
	'table.alignLeft' : 'Left',
	'table.alignCenter' : 'Center',
	'table.alignRight' : 'Right',
	'table.alignTop' : 'Top',
	'table.alignMiddle' : 'Middle',
	'table.alignBottom' : 'Bottom',
	'table.alignBaseline' : 'Baseline',
	'table.border' : 'Border',
	'table.borderWidth' : 'Width',
	'table.borderColor' : 'Color',
	'table.backgroundColor' : 'Background',
	'map.address' : 'Address: ',
	'map.search' : 'Search',
	'baidumap.address' : 'Address: ',
	'baidumap.search' : 'Search',
	'baidumap.insertDynamicMap' : 'Dynamic Map',
	'anchor.name' : 'Anchor name',
	'formatblock.formatBlock' : {
		h1 : 'Heading 1',
		h2 : 'Heading 2',
		h3 : 'Heading 3',
		h4 : 'Heading 4',
		p : 'Normal'
	},
	'fontname.fontName' : {
		'Arial' : 'Arial',
		'Arial Black' : 'Arial Black',
		'Comic Sans MS' : 'Comic Sans MS',
		'Courier New' : 'Courier New',
		'Garamond' : 'Garamond',
		'Georgia' : 'Georgia',
		'Tahoma' : 'Tahoma',
		'Times New Roman' : 'Times New Roman',
		'Trebuchet MS' : 'Trebuchet MS',
		'Verdana' : 'Verdana'
	},
	'lineheight.lineHeight' : [
		{'1' : 'Line height 1'},
		{'1.5' : 'Line height 1.5'},
		{'2' : 'Line height 2'},
		{'2.5' : 'Line height 2.5'},
		{'3' : 'Line height 3'}
	],
	'template.selectTemplate' : 'Template',
	'template.replaceContent' : 'Replace current content',
	'template.fileList' : {
		'1.html' : 'Image and Text',
		'2.html' : 'Table',
		'3.html' : 'List'
	}
}, 'en');
