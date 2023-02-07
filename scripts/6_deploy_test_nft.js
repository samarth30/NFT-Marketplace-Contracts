const {
  TREASURY_ADDRESS,
  AUCTION,
  MARKETPLACE,
  BUNDLE_MARKETPLACE,
} = require("./constants");

async function main() {
  const NFTTradable = await ethers.getContractFactory("PolygonNFTTradable");
  const nft = await NFTTradable.deploy(
    "Infinix",
    "ART",
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    "10000000000000000000",
    TREASURY_ADDRESS
  );
  await nft.deployed();
  console.log("PolygonNFTTradable deployed to:", nft.address);

  const NFTTradablePrivate = await ethers.getContractFactory(
    "PolygonNFTTradablePrivate"
  );
  const nftPrivate = await NFTTradablePrivate.deploy(
    "IInfinix",
    "IART",
    AUCTION,
    MARKETPLACE,
    BUNDLE_MARKETPLACE,
    "10000000000000000000",
    TREASURY_ADDRESS
  );
  await nftPrivate.deployed();
  console.log("PolygonNFTTradablePrivate deployed to:", nftPrivate.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
