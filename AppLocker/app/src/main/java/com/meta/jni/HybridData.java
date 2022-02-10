package com.meta.jni;

import com.meta.proguard.annotations.DoNotStrip;
import com.meta.soloader.SoLoader;

@DoNotStrip
public class HybridData {
    @DoNotStrip
    private Destructor mDestructor = new Destructor(this);

    static {
        SoLoader.loadLibrary("meta");
    }

    public synchronized void resetNative() {
        this.mDestructor.destruct();
    }

    public boolean isValid() {
        return this.mDestructor.mNativePointer != 0;
    }

    public static class Destructor extends DestructorThread.Destructor {
        @DoNotStrip
        private long mNativePointer;

        static native void deleteNative(long j);

        Destructor(Object referent) {
            super(referent);
        }

        /* access modifiers changed from: package-private */
        @Override // DestructorThread.Destructor
        public void destruct() {
            deleteNative(this.mNativePointer);
            this.mNativePointer = 0;
        }
    }
}
