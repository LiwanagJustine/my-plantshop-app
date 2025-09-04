import { AdminRouteGuard } from "@/components/auth";
import { DashboardLayout } from "@/components/dashboard";

export default function Categories() {
    return (
        <AdminRouteGuard>
            <DashboardLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Categories Management</h1>
                    <p>Manage your product categories here.</p>
                    {/* Categories management UI goes here */}
                </div>
            </DashboardLayout>
        </AdminRouteGuard>
    )
}
