// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("EmployeeSearchModule", (m) => {
  const employee_search = m.contract("Employee_search", [["0x9D748999A7CBe13263F3C8c6bC3c249A11356459"]])
  return {employee_search};
});
