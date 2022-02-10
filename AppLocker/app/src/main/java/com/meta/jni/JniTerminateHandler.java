package com.meta.jni;

import java.lang.Thread;

public class JniTerminateHandler {
    public static void handleTerminate(Throwable t) throws Throwable {
        Thread.UncaughtExceptionHandler h = Thread.getDefaultUncaughtExceptionHandler();
        if (h != null) {
            h.uncaughtException(Thread.currentThread(), t);
        }
    }
}
