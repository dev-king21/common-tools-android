package com.meta.jni;

import com.meta.proguard.annotations.DoNotStrip;
import java.util.Iterator;
import java.util.Map;
import javax.annotation.Nullable;

@DoNotStrip
public class MapIteratorHelper {
    @DoNotStrip
    private final Iterator<Map.Entry> mIterator;
    @DoNotStrip
    @Nullable
    private Object mKey;
    @DoNotStrip
    @Nullable
    private Object mValue;

    @DoNotStrip
    public MapIteratorHelper(Map map) {
        this.mIterator = map.entrySet().iterator();
    }

    /* access modifiers changed from: package-private */
    @DoNotStrip
    public boolean hasNext() {
        if (this.mIterator.hasNext()) {
            Map.Entry entry = this.mIterator.next();
            this.mKey = entry.getKey();
            this.mValue = entry.getValue();
            return true;
        }
        this.mKey = null;
        this.mValue = null;
        return false;
    }
}
