export interface IDrain {
    readonly Width: number;
    
    readonly Span: number;
    
    readonly Depth: number;
    
    readonly Thickness: number;
    
    readonly BlindingThickness: number;
    
    readonly WorkingAllowance: number;

    getDrainDepth(): number;
    
    getDrainWidth(): number;
    
    getExcavationDepth(): number;
    
    getExcavationWidth(): number;

    getVolumeOfConcrete(): number;
    
    getAreaOfFormwork(): number;
    
    getVolumeOfExcavation(): number;
    
    getVolumeOfCartAway(): number;

    getVolumeofBlinding(): number;
}