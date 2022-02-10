package com.meta.jni;

import com.meta.proguard.annotations.DoNotStrip;
import com.meta.soloader.SoLoader;

@DoNotStrip
public class ThreadScopeSupport {
    private static native void runStdFunctionImpl(long j);

    static {
        SoLoader.loadLibrary("meta");
    }

    @DoNotStrip
    private static void runStdFunction(long ptr) {
        runStdFunctionImpl(ptr);
    }
}
