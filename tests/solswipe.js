const anchor = require("@project-serum/anchor");
const { SystemProgram } = require("@solana/web3.js");

const main = async () => {
  console.log(":🚀 Starting test...");

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solswipe;

  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log(":🎉 Your transaction signature. Done!", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 Gif Count", account.totalGifs.toString());

  // add a gif
  await program.rpc.addGif("Insert-Gif-Link-Here",{
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 Gif Count', account.totalGifs.toString());

  // Access the gif list
  console.log('👀 Gif List', account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}

runMain();