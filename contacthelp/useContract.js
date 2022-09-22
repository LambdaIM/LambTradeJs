import { getContract } from "./utils.js";

import ABI_ZoraModuleManager from "../constants/abis/ZoraModuleManager.json";
import ABI_ZoraProtocolFeeSettings from "../constants/abis/ZoraProtocolFeeSettings.json";
import ABI_ERC721TransferHelper from "../constants/abis/ERC721TransferHelper.json";
import ABI_RoyaltyEngineV1 from "../constants/abis/RoyaltyEngineV1.json";
import ABI_AsksV1 from "../constants/abis/AsksV1_1.json";
import ABI_OffersV1 from "../constants/abis/OffersV1";
import ABI_NFT from "../constants/abis/NFT.json";


// returns null on errors
function useContract(
  library,
  account,
  address,
  ABI,
  withSignerIfPossible = true
) {

  if (!address || !ABI || !library) return null;
  try {
    // return new web3.eth.Contract(ABI,address)
    return getContract(
      address,
      ABI,
      library,
      withSignerIfPossible && account ? account : undefined
    );
  } catch (error) {
    console.error("Failed to get contract", error);
    return null;
  }
}


export function useABI_Zora_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_ZoraModuleManager,
    withSignerIfPossible
  );
}


export function useABI_ZoraFee_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_ZoraProtocolFeeSettings,
    withSignerIfPossible
  );
}

export function useABI_ERC721Helper_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_ERC721TransferHelper,
    withSignerIfPossible
  );
}

export function useABI_Royalty_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_RoyaltyEngineV1,
    withSignerIfPossible
  );
}

export function useABI_Asks_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_AsksV1,
    withSignerIfPossible
  );
}

export function useABI_Offers_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_OffersV1,
    withSignerIfPossible
  );
}

export function useABI_NFT_Contract(
  library,
  account,
  tokenAddress,
  withSignerIfPossible
) {

  return useContract(
    library,
    account,
    tokenAddress,
    ABI_NFT,
    withSignerIfPossible
  );
}





