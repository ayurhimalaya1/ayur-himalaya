import { TrendingUp, Users, Package, DollarSign } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-2 block">
                    Welcome Back
                </span>
                <h1 className="font-serif text-4xl text-[#1B3022]">Overview</h1>
                <p className="font-sans text-[#2D2D2D]/60 mt-2">
                    Here's what's happening at Ayur Himalaya today.
                </p>
            </header>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: "Total Revenue", value: "₹45,230", trend: "+12.5%", icon: DollarSign },
                    { label: "Active Orders", value: "24", trend: "+4.1%", icon: Package },
                    { label: "New Leads (Popup)", value: "156", trend: "+22.4%", icon: TrendingUp },
                    { label: "Total Customers", value: "892", trend: "+2.4%", icon: Users },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 border border-[#1B3022]/10 shadow-sm relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                        <div className="absolute -right-6 -top-6 text-[#1B3022]/5 group-hover:scale-110 transition-transform duration-500">
                            <stat.icon size={100} strokeWidth={1} />
                        </div>
                        <span className="font-sans text-xs tracking-wider uppercase text-[#2D2D2D]/60 relative z-10">{stat.label}</span>
                        <div className="mt-4 flex items-end justify-between relative z-10">
                            <h3 className="font-serif text-3xl text-[#1B3022]">{stat.value}</h3>
                            <span className="font-sans text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table Area */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-[#1B3022]/10 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-[#1B3022]/10 flex justify-between items-center">
                        <h2 className="font-serif text-xl text-[#1B3022]">Recent Orders</h2>
                        <button className="font-sans text-xs text-[#1B3022] hover:text-[#D4AF37] uppercase tracking-wider transition-colors">View All</button>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans text-sm">
                                <thead>
                                    <tr className="border-b border-[#1B3022]/10 text-[#2D2D2D]/60">
                                        <th className="pb-4 font-normal">Order ID</th>
                                        <th className="pb-4 font-normal">Date</th>
                                        <th className="pb-4 font-normal">Items</th>
                                        <th className="pb-4 font-normal">Amount</th>
                                        <th className="pb-4 font-normal">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: "#AH-1049", date: "Today, 10:42 AM", items: "Pure Shilajit (x2)", amount: "₹1,700", status: "Processing" },
                                        { id: "#AH-1048", date: "Yesterday", items: "Winter Wellness Bundle", amount: "₹2,450", status: "Shipped" },
                                        { id: "#AH-1047", date: "Yesterday", items: "Kutki Extract", amount: "₹450", status: "Delivered" },
                                        { id: "#AH-1046", date: "Oct 24", items: "Sea Buckthorn Tea", amount: "₹300", status: "Delivered" },
                                    ].map((order, i) => (
                                        <tr key={i} className="border-b border-[#1B3022]/5 hover:bg-[#1B3022]/[0.02] transition-colors">
                                            <td className="py-4 font-medium text-[#1B3022]">{order.id}</td>
                                            <td className="py-4 text-[#2D2D2D]/70">{order.date}</td>
                                            <td className="py-4 text-[#2D2D2D]/70">{order.items}</td>
                                            <td className="py-4 text-[#1B3022]">{order.amount}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Low Inventory Alert */}
                <div className="bg-white rounded-xl border border-[#1B3022]/10 shadow-sm">
                    <div className="p-6 border-b border-[#1B3022]/10">
                        <h2 className="font-serif text-xl text-[#1B3022] text-red-800 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Low Inventory Alert
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {[
                                { name: "Yarsagumba (Keeda Jadi)", stock: 2, threshold: 5 },
                                { name: "Himalayan Pink Salt", stock: 8, threshold: 20 },
                                { name: "Kutki (Liver Miracle)", stock: 12, threshold: 15 }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-[#1B3022] text-sm">{item.name}</span>
                                        <span className="font-sans text-xs text-red-600 font-bold">{item.stock} left</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full"
                                            style={{ width: `${(item.stock / item.threshold) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 bg-[#1B3022]/5 text-[#1B3022] font-sans tracking-[0.2em] text-xs uppercase py-3 rounded-lg hover:bg-[#1B3022]/10 transition-colors">
                            Manage Inventory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
