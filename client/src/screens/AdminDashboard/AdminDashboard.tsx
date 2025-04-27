import React from "react";
import { SectionReorderingPanel } from "./SectionReorderingPanel";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../contexts/AuthContext";

export const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Here you can manage the organization of landing page sections. Use
            the drag-and-drop interface below to reorder sections as needed.
          </p>
        </div>

        <SectionReorderingPanel />

        <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Instructions</h3>
          <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1">
            <li>Drag and drop sections to reorder them</li>
            <li>Click "Save Section Order" to save your changes</li>
            <li>Changes will be reflected on the landing page immediately</li>
            <li>
              The default admin credentials are username: <strong>admin</strong>{" "}
              and password: <strong>admin123</strong>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};
