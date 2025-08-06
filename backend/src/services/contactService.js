import Contact from '../models/contactModel.js';

class ContactService {
  async createContact(contactData) {
    return await Contact.create(contactData);
  }

  async getAllContacts(query = {}) {
    const { page = 1, limit = 10, status, search } = query;
    
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments(filter);

    return {
      contacts,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    };
  }

  async getContactById(id) {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async updateContact(id, contactData) {
    const contact = await Contact.findByIdAndUpdate(id, contactData, {
      new: true,
      runValidators: true
    });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async deleteContact(id) {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async updateContactStatus(id, status) {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async getUnreadContacts() {
    return await Contact.find({ status: 'unread' }).sort({ createdAt: -1 });
  }
}

const contactService = new ContactService();
export default contactService; 