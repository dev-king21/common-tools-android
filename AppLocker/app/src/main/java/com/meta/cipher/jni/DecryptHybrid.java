package com.meta.cipher.jni;

import com.meta.crypto.proguard.annotations.DoNotStrip;
import com.meta.jni.HybridData;


/**
 * JNI wrapper for Conceal's Decrypt object in C++.
 */
public class DecryptHybrid {
    // load native

    @DoNotStrip
    private final HybridData mHybridData;

    public DecryptHybrid(byte[] key, byte[] entity) {
        mHybridData = initHybrid(key, entity);
    }

    @DoNotStrip
    public DecryptHybrid(HybridData hybridData) {
        // to be created from C++
        mHybridData = hybridData;
    }

    private static native HybridData initHybrid(byte[] key, byte[] entity);

    public native void start(byte[] header);
    public native void read(
            byte[] src,
            int srcOffset,
            byte[] target,
            int targetOffset,
            int count);
    public native boolean end(byte[] tail);
}