package com.meta.jni;

import java.lang.ref.PhantomReference;
import java.lang.ref.ReferenceQueue;
import java.util.concurrent.atomic.AtomicReference;

public class DestructorThread {
    private static DestructorList sDestructorList = new DestructorList();
    private static DestructorStack sDestructorStack = new DestructorStack();
    private static ReferenceQueue sReferenceQueue = new ReferenceQueue();
    private static Thread sThread = new Thread("HybridData DestructorThread") {
        /* class DestructorThread.AnonymousClass1 */

        public void run() {
            while (true) {
                try {
                    Destructor current = (Destructor) DestructorThread.sReferenceQueue.remove();
                    current.destruct();
                    if (current.previous == null) {
                        DestructorThread.sDestructorStack.transferAllToList();
                    }
                    DestructorList.drop(current);
                } catch (InterruptedException e) {
                }
            }
        }
    };

    public static abstract class Destructor extends PhantomReference<Object> {
        private Destructor next;
        private Destructor previous;

        /* access modifiers changed from: package-private */
        public abstract void destruct();

        Destructor(Object referent) {
            super(referent, DestructorThread.sReferenceQueue);
            DestructorThread.sDestructorStack.push(this);
        }

        private Destructor() {
            super(null, DestructorThread.sReferenceQueue);
        }
    }

    static {
        sThread.start();
    }

    private static class Terminus extends Destructor {
        private Terminus() {
            super();
        }

        /* access modifiers changed from: package-private */
        @Override // DestructorThread.Destructor
        public void destruct() {
            throw new IllegalStateException("Cannot destroy Terminus Destructor.");
        }
    }

    /* access modifiers changed from: private */
    public static class DestructorStack {
        private AtomicReference<Destructor> mHead;

        private DestructorStack() {
            this.mHead = new AtomicReference<>();
        }

        public void push(Destructor newHead) {
            Destructor oldHead;
            do {
                oldHead = this.mHead.get();
                newHead.next = oldHead;
            } while (!this.mHead.compareAndSet(oldHead, newHead));
        }

        public void transferAllToList() {
            Destructor current = this.mHead.getAndSet(null);
            while (current != null) {
                Destructor next = current.next;
                DestructorThread.sDestructorList.enqueue(current);
                current = next;
            }
        }
    }

    /* access modifiers changed from: private */
    public static class DestructorList {
        private Destructor mHead = new Terminus();

        public DestructorList() {
            this.mHead.next = new Terminus();
            this.mHead.next.previous = this.mHead;
        }

        public void enqueue(Destructor current) {
            current.next = this.mHead.next;
            this.mHead.next = current;
            current.next.previous = current;
            current.previous = this.mHead;
        }

        /* access modifiers changed from: private */
        public static void drop(Destructor current) {
            current.next.previous = current.previous;
            current.previous.next = current.next;
        }
    }
}
