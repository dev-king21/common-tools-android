package com.meta.cipher.jni;

import com.meta.crypto.proguard.annotations.DoNotStrip;
import com.meta.jni.HybridData;


/**
 * JNI wrapper for Conceal's PBKDF2 object in C++.
 */
public class PBKDF2Hybrid {
    // load native

    @DoNotStrip
    private final HybridData mHybridData;

    public PBKDF2Hybrid() {
        mHybridData = initHybrid();
    }

    private static native HybridData initHybrid();

    public native void setIterations(int iterations);
    public native void setPassword(byte[] password, int offset, int count);
    public native void setSalt(byte[] salt, int offset, int count);
    public native void setKeyLengthInBytes(int keyLength);
    public native byte[] generate();
    public native byte[] getKey();
    public native byte[] getSalt();
}
