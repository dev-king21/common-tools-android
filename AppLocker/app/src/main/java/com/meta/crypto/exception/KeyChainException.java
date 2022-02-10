package com.meta.crypto.exception;

public class KeyChainException extends Exception {
    public KeyChainException(String message) {
        super(message);
    }

    public KeyChainException(String message, Throwable cause) {
        super(message, cause);
    }
}
