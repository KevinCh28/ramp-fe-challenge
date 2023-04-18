import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
  Employee,
} from "./types"
import mockData from "../mock-data.json"

const TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  const start = page * TRANSACTIONS_PER_PAGE
  const end = start + TRANSACTIONS_PER_PAGE

  const nextPage = end < data.transactions.length ? page + 1 : null

  if (end >= data.transactions.length) {
    const element = document.getElementsByClassName("RampButton")[0];
    element.style.display = "none";
  }

  return {
    nextPage,
    data: data.transactions.slice(0, end),
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    throw new Error("Employee ID cannot be null")
  }
  return data.transactions.filter((transaction) => transaction.employee.id === employeeId);
}

export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {
  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )

  if (!transaction) {
    throw new Error("Invalid transaction to approve")
  }

  transaction.approved = value
}
