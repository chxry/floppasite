{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      forAllSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
    in
    {
      packages = forAllSystems (system: {
        default =
          with import nixpkgs { inherit system; };
          let
            manifest = builtins.fromJSON (builtins.readFile ./package.json);
          in
          pkgs.stdenv.mkDerivation (finalAttrs: {
            pname = manifest.name;
            version = manifest.version;

            src = ./.;
            nativeBuildInputs = [ nodejs pnpm.configHook ];
            pnpmDeps = pnpm.fetchDeps {
              inherit (finalAttrs) pname version src;
              hash = "sha256-fUTBIBVxOR8eBRVosYNqJN3pLwy1j4AV1uI27ZyJfKg=";
            };

            buildPhase = ''
              runHook preBuild
              pnpm run build
              runHook postBuild
            '';
            installPhase = ''
              runHook preInstall
              mkdir -p $out
              cp -r dist/. $out
              runHook postInstall
            '';
          });
      });
    };
}
