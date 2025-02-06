{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      forAllSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
    in {
    packages = forAllSystems (system: {
      default = with import nixpkgs { inherit system; }; pkgs.buildNpmPackage {
        pname = "floppa site";
        version = "1.0.0";

        src = ./.;
        npmDepsHash = "sha256-ojiUcsDdXGMageLjL98AUOvxrZJV4YUu/JJf955VX4o=";
      
        installPhase = ''
          cp -pr dist $out
        '';
      };
    });
  };
}
