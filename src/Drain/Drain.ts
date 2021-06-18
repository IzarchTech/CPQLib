import { IDrain } from "./IDrain";

export class Drain implements IDrain {
  readonly BlindingThickness: number;
  readonly Depth: number;
  readonly Span: number;
  readonly Thickness: number;
  readonly Width: number;
  readonly WorkingAllowance: number;

  constructor(
    depth: number,
    width: number,
    span: number,
    thickness: number,
    blindingThickness: number = 0,
    workingAllowance: number = 0
  ) {
    this.Depth = depth;
    this.Width = width;
    this.Span = span;
    this.Thickness = thickness;
    this.BlindingThickness = blindingThickness;
    this.WorkingAllowance = workingAllowance;
  }

  static instance = (
    depth: number,
    width: number,
    span: number,
    thickness: number,
    blindingThickness: number = 0,
    workingAllowance: number = 0
  ) => {
    return new Drain(
      depth,
      width,
      span,
      thickness,
      blindingThickness,
      workingAllowance
    );
  };

  getAreaOfFormwork(): number {
    if (this.WorkingAllowance > 0)
      return 2 * this.Span * (this.Depth + this.getDrainDepth());

    return 2 * this.Span * this.Depth;
  }

  getDrainDepth(): number {
    return this.Thickness + this.Depth;
  }

  getDrainWidth(): number {
    return this.Thickness * 2 + this.Width;
  }

  getExcavationDepth(): number {
    return this.getDrainDepth() + this.BlindingThickness;
  }

  getExcavationWidth(): number {
    return this.getDrainWidth() + 2 * this.WorkingAllowance;
  }

  getVolumeOfCartAway(): number {
    return this.getDrainDepth() * this.getExcavationDepth() * this.Span;
  }

  getVolumeOfConcrete(): number {
    return this.Span * this.Thickness * (2 * this.Depth + this.getDrainWidth());
  }

  getVolumeOfExcavation(): number {
    return this.getExcavationDepth() * this.getExcavationWidth() * this.Span;
  }

  getVolumeofBlinding(): number {
    return this.getExcavationWidth() * this.BlindingThickness * this.Span;
  }
}
