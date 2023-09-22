import { BigNumber } from "ethers"
import { UnspentTransactionOutput } from "../bitcoin"
import { Hex } from "../../hex"

/**
 * Interface for communication with the TBTC v2 token on-chain contract.
 */
export interface TBTCToken {
  /**
   * Gets the total supply of the TBTC v2 token. The returned value is in
   * ERC 1e18 precision, it has to be converted before using as Bitcoin value
   * with 1e8 precision in satoshi.
   * @param blockNumber Optional parameter determining the block the total
   *        supply should be fetched for. If this parameter is not set, the
   *        total supply is taken for the latest block.
   */
  // TODO: Consider adding a custom type to handle conversion from ERC with 1e18
  //       precision to Bitcoin in 1e8 precision (satoshi).
  totalSupply(blockNumber?: number): Promise<BigNumber>

  /**
   * Requests redemption in one transacion using the `approveAndCall` function
   * from the tBTC on-chain token contract. Then the tBTC token contract calls
   * the `receiveApproval` function from the `TBTCVault` contract which burns
   * tBTC tokens and requests redemption.
   * @param walletPublicKey - The Bitcoin public key of the wallet. Must be in
   *        the compressed form (33 bytes long with 02 or 03 prefix).
   * @param mainUtxo - The main UTXO of the wallet. Must match the main UTXO
   *        held by the on-chain Bridge contract.
   * @param redeemerOutputScript - The output script that the redeemed funds
   *        will be locked to. Must be un-prefixed and not prepended with
   *        length.
   * @param amount - The amount to be redeemed with the precision of the tBTC
   *        on-chain token contract.
   * @returns Transaction hash of the approve and call transaction.
   */
  requestRedemption(
    walletPublicKey: string,
    mainUtxo: UnspentTransactionOutput,
    redeemerOutputScript: string,
    amount: BigNumber
  ): Promise<Hex>
}
