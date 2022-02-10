package com.meta.android.crypto.keychain;

import com.meta.crypto.Conceal;

/**
 * Conceal factory for android.
 * It sets up the right random number generator.
 */
public class AndroidConceal extends Conceal {

    private static AndroidConceal sInstance;

    public static synchronized AndroidConceal get() {
        if (sInstance == null) {
            sInstance = new AndroidConceal();
        }
        return sInstance;
    }

    private AndroidConceal() {
        super(new AndroidCryptoLibrary(), SecureRandomFix.createLocalSecureRandom());
    }
}