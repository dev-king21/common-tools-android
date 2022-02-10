package com.meta.jni;

import com.meta.proguard.annotations.DoNotStrip;

@DoNotStrip
public class NativeRunnable implements Runnable {
    private final com.meta.jni.HybridData mHybridData;

    public native void run();

    private NativeRunnable(HybridData hybridData) {
        this.mHybridData = hybridData;
    }
}
