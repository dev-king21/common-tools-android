package com.meta.crypto.util;

import com.meta.crypto.exception.CryptoInitializationException;
/**
 * An implementation of {@link NativeCryptoLibrary} that uses
 * {@link System#loadLibrary(String)} to load the crypto libraries.
 */
public class SystemNativeCryptoLibrary implements NativeCryptoLibrary {

    private static final String[] LIBS = new String[] {"concealcpp", "concealjni"};

    private boolean mLoadLibraries;
    private boolean mLibrariesLoaded;
    private volatile UnsatisfiedLinkError mLinkError;

    public SystemNativeCryptoLibrary() {
        mLoadLibraries = true;
        mLibrariesLoaded = false;
        mLinkError = null;
    }

    @Override
    public synchronized void ensureCryptoLoaded() throws CryptoInitializationException {
        if (!loadLibraries()) {
            throw new CryptoInitializationException(mLinkError);
        }
    }

    private synchronized boolean loadLibraries() {
        if (!mLoadLibraries) {
            return mLibrariesLoaded;
        }
        try {
            for (String name : LIBS) {
                System.loadLibrary(name);
            }
            mLibrariesLoaded = true;
        } catch (UnsatisfiedLinkError error) {
            mLinkError = error;
            mLibrariesLoaded = false;
        }
        mLoadLibraries = false;
        return mLibrariesLoaded;
    }
}
