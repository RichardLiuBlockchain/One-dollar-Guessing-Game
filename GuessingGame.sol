pragma solidity ^0.8.0;  
  
import "@chainlink/contracts/src/v0.7.0/ChainlinkClient.sol";  
import "@chainlink/contracts/src/v0.7.0/utils/ChainlinkHelper.sol";  
  
contract BetContract {  
    struct Bet {  
        uint price;  
        address address;  
    }  
      
    mapping (address => Bet) private bets;  
    uint private maxPrice;  
    uint private closestBet;  
    uint private closestBetDiff;  
      
    event LogNewBet(uint price, address addr);  
    event LogHighestPrice(uint price);  
    event LogClosestBet(uint price, address addr, uint diff);  
      
    function bet(uint price) public payable {  
        require(msg.value == 1 * 10**18); // 1 USD in ETH  
        bet.price = price;  
        bet.address = msg.sender;  
        maxPrice = price;  
        closestBetDiff = abs(maxPrice - price);  
        emit LogNewBet(price, bet.address);  
    }  
      
    function checkWinner() internal view returns (uint, address, uint) {  
        if (maxPrice > 0 && maxPrice > bets[msg.sender].price) {  
            return (maxPrice, msg.sender, 0);  
        } else if (abs(maxPrice - bets[msg.sender].price) < abs(maxPrice - closestBet)) {  
            closestBet = bets[msg.sender].price;  
            closestBetDiff = abs(maxPrice - closestBet);  
            return (closestBet, bets[msg.sender].address, closestBetDiff);  
        } else {  
            return (0, 0, 0);  
        }  
    }  
      
    function getHighestPrice() public view returns (uint) {  
        ChainlinkHelper helper = new ChainlinkHelper(address: "0x6F7a38B974aB4E2dC68A5F53e97aC73524C9b445"); // Chainlink Helper contract address  
        return helper.getProxi().callExternalFunction("getHighestPrice", [], this);  
    }  
}