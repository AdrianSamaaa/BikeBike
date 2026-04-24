import { useData } from '../context/DataContext';
import { AlertTriangle } from 'lucide-react';

export function Overview() {
  const { products, repairs, customers, transactions } = useData();

  const today = new Date().toISOString().split('T')[0];
  const todayTransactions = transactions.filter(t => t.date === today);
  const todaySales = todayTransactions.reduce((sum, t) => sum + t.amount, 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().split('T')[0];
  const weekTransactions = transactions.filter(t => t.date >= weekAgoStr);
  const weekSales = weekTransactions.reduce((sum, t) => sum + t.amount, 0);

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const monthAgoStr = monthAgo.toISOString().split('T')[0];
  const monthTransactions = transactions.filter(t => t.date >= monthAgoStr);
  const monthSales = monthTransactions.reduce((sum, t) => sum + t.amount, 0);

  const repairsInProgress = repairs.filter(r => r.status === 'In Progress' || r.status === 'Waiting').length;
  const totalRepairsToday = repairs.filter(r => r.status !== 'Completed').length;
  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold);
  const overdueRepairs = repairs.filter(r => {
    return r.estimatedCompletion < today && r.status !== 'Completed';
  });

  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-blue-600 border-2 border-blue-800 rounded p-6">
          <h3 className="text-white text-base mb-3">Today's Sales</h3>
          <div className="text-white text-4xl font-bold mb-2">₱{todaySales.toLocaleString()}</div>
          <p className="text-blue-100 text-sm">
            Week: ₱{weekSales.toLocaleString()} | Month: ₱{monthSales.toLocaleString()}
          </p>
        </div>

        <div className="bg-blue-600 border-2 border-blue-800 rounded p-6">
          <h3 className="text-white text-base mb-3">Active Repairs</h3>
          <div className="text-white text-4xl font-bold mb-2">{repairsInProgress}</div>
          <p className="text-blue-100 text-sm">
            Total repairs today: {totalRepairsToday}
          </p>
        </div>

        <div className="bg-blue-600 border-2 border-blue-800 rounded p-6">
          <h3 className="text-white text-base mb-3">Total Customers</h3>
          <div className="text-white text-4xl font-bold mb-2">{customers.length}</div>
          <p className="text-blue-100 text-sm">
            Registered Customers: 489
          </p>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-blue-600 border-2 border-blue-800 rounded p-6">
        <h3 className="text-red-500 text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6" />
          Alerts
        </h3>
        <ul className="space-y-2 text-white">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Low Stock Alert: {lowStockItems.length} items are low on stock.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Overdue Repairs: {overdueRepairs.length} bikes are overdue for repairs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Staff Alert: Two Mechanics are currently on break.</span>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Best Selling Products */}
        <div className="bg-blue-600 border-2 border-blue-800 rounded p-6">
          <h3 className="text-white text-xl font-semibold mb-4 italic">Best Selling Products</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-white pb-2 border-b border-blue-500">
              <span className="font-semibold">Product</span>
              <span className="font-semibold">Units Sold:</span>
            </div>
            {topProducts.map((product) => (
              <div key={product.id} className="flex justify-between text-white py-2">
                <span>{product.name}</span>
                <span className="font-semibold">{product.sales}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-blue-600 border-2 border-blue-800 rounded p-6">
          <h3 className="text-white text-xl font-semibold mb-4 italic">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-500 text-white">
                  <th className="text-left py-2 font-semibold">ID</th>
                  <th className="text-left py-2 font-semibold">Date</th>
                  <th className="text-left py-2 font-semibold">Product</th>
                  <th className="text-left py-2 font-semibold">Qty</th>
                  <th className="text-left py-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, idx) => (
                  <tr key={transaction.id} className="text-white">
                    <td className="py-2">{String(idx + 1).padStart(3, '0')}</td>
                    <td className="py-2">{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td className="py-2">{transaction.productName || 'Various'}</td>
                    <td className="py-2">{transaction.quantity || 1}</td>
                    <td className="py-2">₱{transaction.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}