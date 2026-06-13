import { useMemo, useState, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import type { User } from './types';

const App = () => {
  const [users, setUsers] = useState<User[] | []>([
    { id: '1', name: 'Leanne Graham', email: 'Sincere@april.biz' },
    { id: '2', name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
    { id: '3', name: 'Clementine Bauch', email: 'Nathan@yesenia.net' },
    { id: '4', name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org' },
    { id: '5', name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca' },
    { id: '6', name: 'Dennis Schulist', email: 'Karley_Dach@jasper.info' },
  ]);
  const [query, setQuery] = useState<string>('');

  // remove user item
  const handleUserRemove = (userId: string) => {
    const removeUser = users.filter((user: User) => user.id !== userId);
    setUsers(removeUser);
  };

  //   search query
  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  //   filtered users by search query
  const filteredUsers = useMemo(() => {
    return users.filter((user: User) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [users, query]);

  // render user list
  const renderUsers =
    filteredUsers.length > 0 ? (
      <ul className="flex flex-col gap-y-2.5">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded-lg border border-gray-300 p-3"
          >
            <div>
              <h4 className="leading-4 font-medium">{user.name}</h4>
              <span className="text-sm text-sky-700">{user.email}</span>
            </div>
            <button
              className="cursor-pointer rounded-full bg-sky-100 px-2.5 py-1 text-sm font-medium text-sky-700"
              onClick={() => handleUserRemove(user.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
        className="text-center text-base text-gray-600"
      >
        Did not match. Please search again.
      </motion.div>
    );

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full p-4 md:max-w-md">
        <div className="flex flex-col gap-y-4">
          <div>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-0"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleSearchOnChange}
            />
          </div>
          <div>{renderUsers}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
