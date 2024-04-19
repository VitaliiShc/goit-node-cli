const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readData() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

async function writeData(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const contacts = await readData();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readData();
  const contactById = contacts.find(
    (contact) => contact.id === contactId
  );
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await readData();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (!~idx) {
    return null;
  }
  const removedContact = contacts.splice(idx, 1);
  await writeData(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readData();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeData(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
