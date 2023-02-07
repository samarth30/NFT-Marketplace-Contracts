// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/introspection/IERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolygonAddressRegistry is Ownable {
    bytes4 private constant INTERFACE_ID_ERC721 = 0x80ac58cd;

    /// @notice Infinix contract
    address public infinix;

    /// @notice PolygonAuction contract
    address public auction;

    /// @notice PolygonMarketplace contract
    address public marketplace;

    /// @notice PolygonBundleMarketplace contract
    address public bundleMarketplace;

    /// @notice PolygonNFTFactory contract
    address public factory;

    /// @notice PolygonNFTFactoryPrivate contract
    address public privateFactory;

    /// @notice PolygonArtFactory contract
    address public artFactory;

    /// @notice PolygonArtFactoryPrivate contract
    address public privateArtFactory;

    /// @notice PolygonTokenRegistry contract
    address public tokenRegistry;

    /// @notice PolygonPriceFeed contract
    address public priceFeed;

    /**
     @notice Update infinix contract
     @dev Only admin
     */
    function updateInfinix(address _infinix) external onlyOwner {
        require(
            IERC165(_infinix).supportsInterface(INTERFACE_ID_ERC721),
            "Not ERC721"
        );
        infinix = _infinix;
    }

    /**
     @notice Update PolygonAuction contract
     @dev Only admin
     */
    function updateAuction(address _auction) external onlyOwner {
        auction = _auction;
    }

    /**
     @notice Update PolygonMarketplace contract
     @dev Only admin
     */
    function updateMarketplace(address _marketplace) external onlyOwner {
        marketplace = _marketplace;
    }

    /**
     @notice Update PolygonBundleMarketplace contract
     @dev Only admin
     */
    function updateBundleMarketplace(address _bundleMarketplace)
        external
        onlyOwner
    {
        bundleMarketplace = _bundleMarketplace;
    }

    /**
     @notice Update PolygonNFTFactory contract
     @dev Only admin
     */
    function updateNFTFactory(address _factory) external onlyOwner {
        factory = _factory;
    }

    /**
     @notice Update PolygonNFTFactoryPrivate contract
     @dev Only admin
     */
    function updateNFTFactoryPrivate(address _privateFactory)
        external
        onlyOwner
    {
        privateFactory = _privateFactory;
    }

    /**
     @notice Update PolygonArtFactory contract
     @dev Only admin
     */
    function updateArtFactory(address _artFactory) external onlyOwner {
        artFactory = _artFactory;
    }

    /**
     @notice Update PolygonArtFactoryPrivate contract
     @dev Only admin
     */
    function updateArtFactoryPrivate(address _privateArtFactory)
        external
        onlyOwner
    {
        privateArtFactory = _privateArtFactory;
    }

    /**
     @notice Update token registry contract
     @dev Only admin
     */
    function updateTokenRegistry(address _tokenRegistry) external onlyOwner {
        tokenRegistry = _tokenRegistry;
    }

    /**
     @notice Update price feed contract
     @dev Only admin
     */
    function updatePriceFeed(address _priceFeed) external onlyOwner {
        priceFeed = _priceFeed;
    }
}
