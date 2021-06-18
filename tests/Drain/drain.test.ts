import CPQLib, { Drain } from "../../src";
type drainData = {
  depth: number;
  width: number;
  span: number;
  thickness: number;
  blindingThickness?: number;
  workingAllowance?: number;
};

type drainExpectedData = {
  volumeOfConcrete: number;
  areaOfFormwork: number;
  volumeOfExcavtion: number;
  volumeOfCartAway: number;
  volumeOfBlinding: number;
};

type drainTestData = {
  drain: Drain;
  expected: drainExpectedData;
};

const testData: Array<drainTestData> = [
  {
    drain: CPQLib.Drain.instance(0.6, 0.6, 1, 0.15, 0.05, 0.225),
    expected: {
      volumeOfConcrete: 0.315,
      areaOfFormwork: 2.7,
      volumeOfExcavtion: 1.08,
      volumeOfCartAway: 0.6,
      volumeOfBlinding: 0.068,
    },
  },
  {
    drain: CPQLib.Drain.instance(0.6, 0.6, 1, 0.15, 0.05),
    expected: {
      volumeOfConcrete: 0.315,
      areaOfFormwork: 1.2,
      volumeOfExcavtion: 0.72,
      volumeOfCartAway: 0.6,
      volumeOfBlinding: 0.045,
    },
  },
  {
    drain: CPQLib.Drain.instance(1.2, 1.8, 1, 0.15, 0.05, 0.225),
    expected: {
      volumeOfConcrete: 0.675,
      areaOfFormwork: 5.1,
      volumeOfExcavtion: 3.57,
      volumeOfCartAway: 1.89,
      volumeOfBlinding: 0.128,
    },
  },
];

describe("Drain tests", () => {
  describe("Intialization tests", () => {
    const drain: drainData = {
      width: 0.6,
      depth: 0.6,
      span: 1.0,
      thickness: 0.15,
      blindingThickness: 0.05,
      workingAllowance: 0.225,
    };

    const staticDrainInstance = CPQLib.Drain.instance(
      drain.depth,
      drain.width,
      drain.span,
      drain.thickness,
      drain.blindingThickness,
      drain.workingAllowance
    );

    const drainInstance = new CPQLib.Drain(
      drain.depth,
      drain.width,
      drain.span,
      drain.thickness,
      drain.blindingThickness,
      drain.workingAllowance
    );

    test("Class instantiation works", () => {
      expect(drainInstance).toBeInstanceOf(CPQLib.Drain);
    });

    test("Static instance works", () => {
      expect(staticDrainInstance).toBeInstanceOf(CPQLib.Drain);
    });

    test("Static instance is same with Class instantiation", () => {
      expect(drainInstance).toEqual(staticDrainInstance);
    });
  });

  describe.each(testData)(
    "Quantity calculation tests",
    ({ drain, expected }) => {
      test(`Volume of concrete for ${drain.Depth} x ${drain.Width} x ${drain.Span} = ${expected.volumeOfConcrete}`, () => {
        expect(drain.getVolumeOfConcrete()).toBeCloseTo(
          expected.volumeOfConcrete
        );
      });

      test(`Area of formwork for ${drain.Depth} x ${drain.Width} x ${drain.Span} = ${expected.areaOfFormwork}`, () => {
        expect(drain.getAreaOfFormwork()).toBeCloseTo(expected.areaOfFormwork);
      });

      test(`Volume of excavation for ${drain.Depth} x ${drain.Width} x ${drain.Span} = ${expected.volumeOfExcavtion}`, () => {
        expect(drain.getVolumeOfExcavation()).toBeCloseTo(
          expected.volumeOfExcavtion
        );
      });

      test(`Volume of cart away for ${drain.Depth} x ${drain.Width} x ${drain.Span} = ${expected.volumeOfCartAway}`, () => {
        expect(drain.getVolumeOfCartAway()).toBeCloseTo(
          expected.volumeOfCartAway
        );
      });

      test(`Volume of blinding for ${drain.Depth} x ${drain.Width} x ${drain.Span} = ${expected.volumeOfBlinding}`, () => {
        expect(drain.getVolumeofBlinding()).toBeCloseTo(
          expected.volumeOfBlinding
        );
      });
    }
  );
});
