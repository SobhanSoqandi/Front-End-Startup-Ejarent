
import Loading from "../../UI/Loading";
import UserItem from "../../features/User/UserItem";
import { useUsers } from "../../features/User/useUsers";

export default function UsersList() {
    const { users, isLoading } = useUsers("getAll");

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm">
            {/* هدر */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">لیست کاربران</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {users.length} کاربر
                </span>
            </div>

            {/* لیست کاربران */}
            {users.length === 0 ? (
                <div> کاربری یافت نشد </div>
            ) : (
                <div className="space-y-3">
                    {users.map((user) => (
                        <UserItem key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}
