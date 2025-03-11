import fs from 'fs';
import path from "path"

const getTheAbi = () => {
    try {
        const parentDirectory = path.join(__dirname, '..')
        const dir = path.resolve(
        parentDirectory,
        "./ignition/deployments/chain-17000/artifacts/QHC#PropertyERC20.json"
        )

        const file = fs.readFileSync(dir, "utf-8");
        const json = JSON.parse(file);
        const abi = json.abi
        console.log(abi)

        return abi
    } catch (e){
        console.log(e);
    }
}

export { getTheAbi };