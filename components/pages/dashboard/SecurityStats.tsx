"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const barData = [
  { name: "AES", security: 95 },
  { name: "RSA", security: 92 },
  { name: "DES", security: 70 },
  { name: "Blowfish", security: 88 },
];

// 📈 Simulated data showing how encryption reduces breach rates over time
const lineData = [
  { year: "2019", no_encryption: 100, AES: 60, RSA: 65, Blowfish: 70 },
  { year: "2020", no_encryption: 95, AES: 50, RSA: 55, Blowfish: 60 },
  { year: "2021", no_encryption: 90, AES: 40, RSA: 45, Blowfish: 52 },
  { year: "2022", no_encryption: 88, AES: 35, RSA: 38, Blowfish: 47 },
  { year: "2023", no_encryption: 82, AES: 28, RSA: 30, Blowfish: 40 },
  { year: "2024", no_encryption: 78, AES: 25, RSA: 27, Blowfish: 36 },
];

export default function SecurityStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* 🔸 Bar Chart — Encryption Strength */}
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">
          Encryption Algorithm Strength (%)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                color: "#f1f5f9",
              }}
            />
            <Bar dataKey="security" fill="#facc15" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Line Chart — Reduction in Security Breaches */}
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">
          Security Breach Reduction Over Time (%)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                color: "#f1f5f9",
              }}
            />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />

            {/* Multiple Lines representing different encryption types */}
            <Line
              type="monotone"
              dataKey="no_encryption"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="No Encryption"
            />
            <Line
              type="monotone"
              dataKey="AES"
              stroke="#facc15"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="AES Encryption"
            />
            <Line
              type="monotone"
              dataKey="RSA"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="RSA Encryption"
            />
            <Line
              type="monotone"
              dataKey="Blowfish"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Blowfish Encryption"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
