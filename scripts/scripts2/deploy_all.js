// to deploy locally
// run: npx hardhat node on a terminal
// then run: npx hardhat run --network localhost scripts/12_deploy_all.js
async function main(network) {
  console.log("network: ", network.name);

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(`Deployer's address: `, deployerAddress);

  const {
    TREASURY_ADDRESS,
    PLATFORM_FEE,
    WRAPPED_FTM_MAINNET,
    WRAPPED_FTM_TESTNET,
  } = require("../constants");

  ////////////
  const Infinix = await ethers.getContractFactory("Infinix");
  const infinix = await Infinix.deploy(TREASURY_ADDRESS, "2000000000000000000");

  await infinix.deployed();
  console.log("PolygonInfinix deployed at", infinix.address);
  ///////////

  //////////
  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = await ProxyAdmin.deploy();
  await proxyAdmin.deployed();

  const PROXY_ADDRESS = proxyAdmin.address;

  console.log("ProxyAdmin deployed to:", proxyAdmin.address);

  const AdminUpgradeabilityProxyFactory = await ethers.getContractFactory(
    "AdminUpgradeabilityProxy"
  );
  //////////

  /////////
  const Marketplace = await ethers.getContractFactory("PolygonMarketplace");
  const marketplaceImpl = await Marketplace.deploy();
  await marketplaceImpl.deployed();

  console.log("PolygonMarketplace deployed to:", marketplaceImpl.address);

  const marketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
    marketplaceImpl.address,
    PROXY_ADDRESS,
    []
  );
  await marketplaceProxy.deployed();
  console.log("Marketplace Proxy deployed at ", marketplaceProxy.address);
  const MARKETPLACE_PROXY_ADDRESS = marketplaceProxy.address;
  const marketplace = await ethers.getContractAt(
    "PolygonMarketplace",
    marketplaceProxy.address
  );

  await marketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
  console.log("Marketplace Proxy initialized");

  /////////

  /////////
  const BundleMarketplace = await ethers.getContractFactory(
    "PolygonBundleMarketplace"
  );
  const bundleMarketplaceImpl = await BundleMarketplace.deploy();
  await bundleMarketplaceImpl.deployed();
  console.log(
    "PolygonBundleMarketplace deployed to:",
    bundleMarketplaceImpl.address
  );

  const bundleMarketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
    bundleMarketplaceImpl.address,
    PROXY_ADDRESS,
    []
  );
  await bundleMarketplaceProxy.deployed();
  console.log(
    "Bundle Marketplace Proxy deployed at ",
    bundleMarketplaceProxy.address
  );
  const BUNDLE_MARKETPLACE_PROXY_ADDRESS = bundleMarketplaceProxy.address;
  const bundleMarketplace = await ethers.getContractAt(
    "PolygonBundleMarketplace",
    bundleMarketplaceProxy.address
  );

  await bundleMarketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
  console.log("Bundle Marketplace Proxy initialized");

  ////////

  ////////
  const Auction = await ethers.getContractFactory("PolygonAuction");
  const auctionImpl = await Auction.deploy();
  await auctionImpl.deployed();
  console.log("PolygonAuction deployed to:", auctionImpl.address);

  const auctionProxy = await AdminUpgradeabilityProxyFactory.deploy(
    auctionImpl.address,
    PROXY_ADDRESS,
    []
  );

  await auctionProxy.deployed();
  console.log("Auction Proxy deployed at ", auctionProxy.address);
  const AUCTION_PROXY_ADDRESS = auctionProxy.address;
  const auction = await ethers.getContractAt(
    "PolygonAuction",
    auctionProxy.address
  );

  await auction.initialize(TREASURY_ADDRESS);
  console.log("Auction Proxy initialized");

  ////////

  ////////
  const Factory = await ethers.getContractFactory("PolygonNFTFactory");
  const factory = await Factory.deploy(
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS,
    "50000000000000000000"
  );
  await factory.deployed();
  console.log("PolygonNFTFactory deployed to:", factory.address);

  const PrivateFactory = await ethers.getContractFactory(
    "PolygonNFTFactoryPrivate"
  );
  const privateFactory = await PrivateFactory.deploy(
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS,
    "50000000000000000000"
  );
  await privateFactory.deployed();
  console.log("PolygonNFTFactoryPrivate deployed to:", privateFactory.address);
  ////////

  ////////
  const NFTTradable = await ethers.getContractFactory("PolygonNFTTradable");
  const nft = await NFTTradable.deploy(
    "Infinix",
    "ART",
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
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
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS
  );
  await nftPrivate.deployed();
  console.log("PolygonNFTTradablePrivate deployed to:", nftPrivate.address);
  ////////

  ////////
  const TokenRegistry = await ethers.getContractFactory("PolygonTokenRegistry");
  const tokenRegistry = await TokenRegistry.deploy();

  await tokenRegistry.deployed();

  console.log("PolygonTokenRegistry deployed to", tokenRegistry.address);
  ////////

  ////////
  const AddressRegistry = await ethers.getContractFactory(
    "PolygonAddressRegistry"
  );
  const addressRegistry = await AddressRegistry.deploy();

  await addressRegistry.deployed();

  console.log("PolygonAddressRegistry deployed to", addressRegistry.address);
  const FANTOM_ADDRESS_REGISTRY = addressRegistry.address;
  ////////

  ////////
  const PriceFeed = await ethers.getContractFactory("PolygonPriceFeed");
  const WRAPPED_FTM =
    network.name === "mainnet" ? WRAPPED_FTM_MAINNET : WRAPPED_FTM_TESTNET;
  const priceFeed = await PriceFeed.deploy(
    FANTOM_ADDRESS_REGISTRY,
    WRAPPED_FTM
  );

  await priceFeed.deployed();

  console.log("PolygonPriceFeed deployed to", priceFeed.address);
  ////////

  ////////
  const ArtTradable = await ethers.getContractFactory("PolygonArtTradable");
  const artTradable = await ArtTradable.deploy(
    "PolygonArt",
    "FART",
    "20000000000000000000",
    TREASURY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS
  );
  await artTradable.deployed();
  console.log("PolygonArtTradable deployed to:", artTradable.address);

  const ArtTradablePrivate = await ethers.getContractFactory(
    "PolygonArtTradablePrivate"
  );
  const artTradablePrivate = await ArtTradablePrivate.deploy(
    "PolygonArt",
    "FART",
    "20000000000000000000",
    TREASURY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS
  );
  await artTradablePrivate.deployed();
  console.log(
    "PolygonArtTradablePrivate deployed to:",
    artTradablePrivate.address
  );
  ////////

  ////////
  const ArtFactory = await ethers.getContractFactory("PolygonArtFactory");
  const artFactory = await ArtFactory.deploy(
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "20000000000000000000",
    TREASURY_ADDRESS,
    "10000000000000000000"
  );
  await artFactory.deployed();
  console.log("PolygonArtFactory deployed to:", artFactory.address);

  const ArtFactoryPrivate = await ethers.getContractFactory(
    "PolygonArtFactoryPrivate"
  );
  const artFactoryPrivate = await ArtFactoryPrivate.deploy(
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "20000000000000000000",
    TREASURY_ADDRESS,
    "10000000000000000000"
  );
  await artFactoryPrivate.deployed();
  console.log(
    "PolygonArtFactoryPrivate deployed to:",
    artFactoryPrivate.address
  );
  ////////

  await marketplace.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);
  await bundleMarketplace.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);

  await auction.updateAddressRegistry(FANTOM_ADDRESS_REGISTRY);

  await addressRegistry.updateInfinix(infinix.address);
  await addressRegistry.updateAuction(auction.address);
  await addressRegistry.updateMarketplace(marketplace.address);
  await addressRegistry.updateBundleMarketplace(bundleMarketplace.address);
  await addressRegistry.updateNFTFactory(factory.address);
  await addressRegistry.updateTokenRegistry(tokenRegistry.address);
  await addressRegistry.updatePriceFeed(priceFeed.address);
  await addressRegistry.updateArtFactory(artFactory.address);

  await tokenRegistry.add(WRAPPED_FTM);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
