package com.meta.cipher.jni;

import com.meta.crypto.proguard.annotations.DoNotStrip;
import com.meta.jni.HybridData;

/**
 * JNI wrapper for Conceal's MacDecoder object in C++.
 */
public class MacDecoderHybrid {
    // load native

    @DoNotStrip
    private final HybridData mHybridData;

    public MacDecoderHybrid(byte[] key, byte[] entity) {
        mHybridData = initHybrid(key, entity);
    }

    private static native HybridData initHybrid(byte[] key, byte[] entity);

    public native void start(byte[] header);
    public native void read(byte[] data, int offset, int count);
    public native boolean end(byte[] tail);
}
