import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { execute } = deployments
  const { deployer } = await getNamedAccounts()

  const ArbitrumWormholeGateway = await deployments.get("ArbitrumWormholeGateway")

  await execute(
    "ArbitrumTBTC",
    { from: deployer, log: true, waitConfirmations: 1 },
    "addMinter",
    ArbitrumWormholeGateway.address,
  )
}

export default func

func.tags = ["AuthorizeWormholeGateway"]
