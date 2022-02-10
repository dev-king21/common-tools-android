package com.meta.jni;

import com.meta.proguard.annotations.DoNotStrip;
import com.meta.soloader.SoLoader;

@DoNotStrip
public class Countable {
    @DoNotStrip
    private long mInstance = 0;

    public native void dispose();

    static {
        SoLoader.loadLibrary("meta");
    }

    /* access modifiers changed from: protected */
    public void finalize() throws Throwable {
        dispose();
        super.finalize();
    }
}
