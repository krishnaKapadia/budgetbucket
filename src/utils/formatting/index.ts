/** @format */
import currency from "currency.js";
import moment from "moment";

export function formatCurrency(value: number) {
  return currency(value, { fromCents: true }).format();
}

export function formatDate(date: string) {
  return moment(date).format("ddd - MMM Do YYYY");
}

export function getCurrencyStyle(amount: number) {
  return amount < 0 ? "text-red-400" : amount > 0 ? "text-green-400" : "";
}
