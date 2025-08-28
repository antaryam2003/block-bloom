# Employee Search DApp

A decentralized application where an **admin** (MetaMask account) can add employee records, and **any user** can look up an employee by ID.  
Smart contract was first created and deployed on **Remix**, then migrated to a **Hardhat** project and redeployed to **Sepolia** using **Alchemy**. The frontend is a **React (Vite)** app that interacts with the contract using **ethers.js**.

---

## Features
- Admin can add employee details.
- Anyone can view employee details by ID.
- Preloaded with employees having IDs **1–12**.

---

## Tech Stack
- **Solidity** (Remix IDE)
- **Hardhat** (deployment)
- **Alchemy** (RPC provider)
- **MetaMask** (wallet)
- **React + Vite** (frontend)
- **ethers.js** (contract interaction)

---

## Setup Instructions

### 1. Smart Contract (Remix IDE)
- Write and deploy the contract in **Remix IDE** with your MetaMask account as the admin.
- Copy the contract code into `contracts/Lock.sol` inside your Hardhat project.

### 2. Hardhat Setup
```bash
node -v
npm init -y
npm i hardhat
npx hardhat init
# Choose: JavaScript project, add .gitignore, install toolbox (yes)
```

### 3. Alchemy & Environment Variables
- Create a new app in [Alchemy](https://alchemy.com) → Name: *Employee Search DApp*, Chain: *Ethereum*, Network: *Sepolia*.
- Copy the RPC URL.
- Create a `.env` file:
  ```ini
  API_URL="YOUR_ALCHEMY_SEPOLIA_URL"
  PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"
  ```

### 4. Hardhat Config
Install dotenv:
```bash
npm i dotenv
```

Update `hardhat.config.js` to use `API_URL` and `PRIVATE_KEY`.

### 5. Deploy Contract
```bash
npx hardhat ignition deploy ./ignition/modules/Lock.js --network sepolia
```
Save the deployed contract address.

### 6. Frontend (React + Vite)
```bash
npm create vite@latest
# Choose React + JavaScript
npm install
npm i ethers
npm run dev
```

- Create `employee.json` in `src/` and paste the contract ABI.
- Update `App.jsx` to interact with your contract (connect wallet, add employee, search employee).
- Modify `App.css` for styling.

---

## Usage
- Admin adds employees (IDs 1–12 preloaded).
- Anyone can search employee details by entering an ID.

---

## Project Structure
```
contracts/Lock.sol          # Smart contract
ignition/modules/Lock.js    # Deployment module
hardhat.config.js           # Hardhat configuration
.env                        # API URL & Private Key
employee-search-frontend/   # Vite React frontend
  └─ src/
     ├─ App.jsx
     └─ employee.json       # ABI
```

---
