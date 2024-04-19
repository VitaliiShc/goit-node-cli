const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts.js');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await listContacts();
      return contactList;

    case 'get':
      const contact = await getContactById(id);
      return contact;

    case 'add':
      const addedContact = await addContact(name, email, phone);
      return addedContact;

    case 'remove':
      const removedContact = await removeContact(id);
      return removedContact;

    default:
      return '\x1B[31m Unknown action type!';
  }
}

invokeAction(options).then(console.table).catch(console.error);
