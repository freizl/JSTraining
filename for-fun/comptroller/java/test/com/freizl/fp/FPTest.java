package com.freizl.fp;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.freizl.fp.FP;
import com.freizl.fp.FPOp;

public class FPTest {

	@Test
	public void testMapNull() {
		List<Long> ys = FP.map(new AddTow(), null);
		assertNotNull(ys);
		assertEquals(0, ys.size());
	}

	@Test
	public void testMapNull2() {
		List<Long> xs = createList1();
		List<Long> ys = FP.map(null, xs);
		assertNotNull(ys);
		assertEquals(0, ys.size());
	}

	@Test
	public void testMap() {
		List<Long> xs = createList1();

		List<Long> ys = FP.map(new AddTow(), xs);

		assertNotNull(ys);
		assertEquals(5, ys.size());
		assertEquals(3, ys.get(0).intValue());
		assertEquals(5, ys.get(1).intValue());
		assertEquals(7, ys.get(2).intValue());
		assertEquals(9, ys.get(3).intValue());
		assertEquals(11, ys.get(4).intValue());
	}

	// [1, 3, 5, 7, 9]
	private List<Long> createList1() {
		List<Long> xs = new ArrayList<Long>();
		for (long i = 1; i < 10;) {
			xs.add(i);
			i += 2;
		}
		return xs;
	}

	private class AddTow implements FP.MapFunc<Long, Long> {
		@Override
		public Long apply(Long t1) {
			return t1 + Integer.valueOf(2);
		}
	}

	@Test
	public void testFoldlSumNull() {
		Long init = Long.valueOf(0);
		Long y = FP.foldl(FPOp.addLong, null, init);

		assertEquals(init, y);
	}

	@Test
	public void testFoldlSumNull2() {
		List<Long> xs = createList1();
		Long init = Long.valueOf(0);
		Long y = FP.foldl(null, xs, init);

		assertEquals(init, y);
	}

	@Test
	public void testFoldlSum() {
		List<Long> xs = createList1();
		Long y = FP.foldl(FPOp.addLong, xs, Long.valueOf(0));

		assertEquals(1 + 3 + 5 + 7 + 9, y.intValue());
	}

}
