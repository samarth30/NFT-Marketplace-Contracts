const {
  TREASURY_ADDRESS,
  MARKETPLACE,
  BUNDLE_MARKETPLACE,
} = require("./constants");

async function main() {
  const ArtTradable = await ethers.getContractFactory("PolygonArtTradable");
  const nft = await ArtTradable.deploy(
    "PolygonArt",
    "FART",
    "20000000000000000000",
    TREASURY_ADDRESS,
    MARKETPLACE,
    BUNDLE_MARKETPLACE
  );
  await nft.deployed();
  console.log("PolygonArtTradable deployed to:", nft.address);

  const ArtTradablePrivate = await ethers.getContractFactory(
    "PolygonArtTradablePrivate"
  );
  const nftPrivate = await ArtTradablePrivate.deploy(
    "PolygonArt",
    "FART",
    "20000000000000000000",
    TREASURY_ADDRESS,
    MARKETPLACE,
    BUNDLE_MARKETPLACE
  );
  await nftPrivate.deployed();
  console.log("PolygonArtTradablePrivate deployed to:", nftPrivate.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
