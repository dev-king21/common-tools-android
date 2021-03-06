package com.meta.cipher.jni;

import com.meta.crypto.keychain.KeyChain;
import com.meta.crypto.proguard.annotations.DoNotStrip;
import com.meta.jni.HybridData;

/**
 * JNI wrapper for Conceal's Decrypt object in C++.
 */
public class CipherHybrid {
    // load native

    @DoNotStrip
    private final HybridData mHybridData;

    public CipherHybrid(byte configId, KeyChain keyChain) {
        mHybridData = initHybrid(configId, keyChain);
    }

    private CipherHybrid(HybridData hybridData) {
        // to be created from C++
        mHybridData = hybridData;
    }

    private static native HybridData initHybrid(byte configId, KeyChain keyChain);

    public native EncryptHybrid createEncrypt(byte[] entity, int offset, int count);
    public native DecryptHybrid createDecrypt(byte[] entity, int offset, int count);
}
