package de.markusfisch.android.pielauncher.graphics;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;

public class Converter {
	public static Bitmap getBitmapFromDrawable(Drawable drawable) {
		if (drawable instanceof BitmapDrawable) {
			return ((BitmapDrawable) drawable).getBitmap();
		}
		Bitmap bitmap = Bitmap.createBitmap(
				drawable.getIntrinsicWidth(),
				drawable.getIntrinsicHeight(),
				Bitmap.Config.ARGB_8888);
		Canvas canvas = new Canvas(bitmap);
		drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
		drawable.draw(canvas);
		return bitmap;
	}
}
