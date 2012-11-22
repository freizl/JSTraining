package com.freizl.fp;

import java.util.ArrayList;
import java.util.List;

/**
 * A few Functional Utils.
 * 
 */
public final class FP {

	/**
	 * map :: (a -> b) -> [a] -> [b]
	 * 
	 */
	public static <A, B> List<B> map(MapFunc<A, B> fn, List<A> xs) {
		List<B> ys = new ArrayList<B>();
		if (null != xs && null != fn) {
			for (A a : xs) {
				ys.add(fn.apply(a));
			}
		}
		return ys;
	}

	/**
	 * fn :: a -> b
	 */
	public interface MapFunc<A, B> {
		B apply(A t1);
	}

	/**
	 * filter :: (a -> Boolean) -> [a] -> [a]
	 * 
	 */
	public static <A> List<A> filter(FilterFunc<A> fn, List<A> xs) {
		List<A> ys = new ArrayList<A>();
		if (null != xs && null != fn) {
			for (A a : xs) {
				if (fn.apply(a)) {
					ys.add(a);
				}
			}
		}
		return ys;
	}

	/**
	 * fn :: a -> boolean
	 */
	public interface FilterFunc<A> {
		boolean apply(A t1);
	}

	/**
	 * foldLeft. foldl :: (b -> a -> b) -> [a] -> b -> b
	 */
	public static <A, B> B foldl(FoldlFunc<A, B> fn, List<A> xs, B init) {
		B re = init;
		if (null != xs && null != fn) {
			for (A a : xs) {
				re = fn.apply(re, a);
			}
		}
		return re;
	}

	/**
	 * fn :: b -> a -> b
	 */
	public interface FoldlFunc<A, B> {
		B apply(B init, A a);
	}
}
