import { useAppSelector } from "@store/hooks";

const Account = () => {
  const accountInfo = useAppSelector((state) => state.auth.user);

  return (
    <div className="p-2 md:p-4 lg:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 flex items-center gap-2">
            Account Overview
          </div>
          <p className="text-sm text-gray-500 mt-2">Manage your personal account details</p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { value: "2", label: "Active Sessions", color: "blue" },
          { value: "100%", label: "Profile Complete", color: "green" },
          { value: "30", label: "Active Days", color: "purple" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-${stat.color}-50 p-6 rounded-xl shadow-sm border border-${stat.color}-100`}
          >
            <div className={`text-xl sm:text-2xl lg:text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md space-y-6 border border-gray-100">
        <div className="text-xl sm:text-2xl  font-semibold text-gray-900 mb-4">Personal Information</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500 mb-1 inline-block">Full Name</label>
            <div className="flex items-center gap-2 p-2 md:p-3 bg-gray-50 border rounded-lg text-gray-900">
              {accountInfo?.name || "Not provided"}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 inline-block">Email Address</label>
            <div className="flex items-center gap-2 p-2 md:p-3 bg-gray-50 border rounded-lg text-gray-900 overflow-hidden">
              {accountInfo?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
