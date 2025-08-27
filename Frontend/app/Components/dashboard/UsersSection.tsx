import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/Components/ui/card";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/Components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/Components/ui/avatar";
import { Badge } from "@/app/Components/ui/badge";
import { Users, UserPlus, Search, Mail, Calendar, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/Components/ui/dropdown-menu";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive';
  joinDate: Date;
  totalOrders: number;
  totalSpent: number;
}

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [users] = useState<User[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      status: "active",
      joinDate: new Date("2024-01-15"),
      totalOrders: 12,
      totalSpent: 2450.00
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      status: "active",
      joinDate: new Date("2024-02-20"),
      totalOrders: 8,
      totalSpent: 1200.00
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      status: "inactive",
      joinDate: new Date("2023-12-10"),
      totalOrders: 3,
      totalSpent: 450.00
    },
    {
      id: "4",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@example.com",
      status: "active",
      joinDate: new Date("2024-03-05"),
      totalOrders: 15,
      totalSpent: 3200.00
    },
  ]);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = users.filter(user => user.status === 'active').length;
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);
  const avgOrderValue = users.reduce((sum, user) => sum + user.totalSpent, 0) / 
                       users.reduce((sum, user) => sum + user.totalOrders, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-500">Manage your customers</p>
        </div>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <p className="text-xs text-gray-500">Registered customers</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Active Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500">From all users</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Avg. Order Value</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Users Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-gray-900">User Management</CardTitle>
          <CardDescription className="text-gray-500">View and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-800" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="rounded-lg border">
            <Table className="text-gray-800">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-100">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                          <AvatarFallback>
                            {user.firstName[0]}{user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user.joinDate.toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900">{user.totalOrders}</TableCell>
                    <TableCell className="text-gray-900">${user.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-200">
                          <DropdownMenuItem className="text-gray-900">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-900">Edit User</DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-900">View Orders</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No users found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersSection;
