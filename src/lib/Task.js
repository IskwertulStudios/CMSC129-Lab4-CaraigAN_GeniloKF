/**
 * @typedef {Object} Subtask
 * @property {string} id
 * @property {string} text
 * @property {boolean} done
 */

export class Subtask {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.text
   * @param {boolean} [params.done]
   */
  constructor({ id, text, done = false }) {
    this.id = id;
    this.text = text;
    this.done = Boolean(done);
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text,
      done: this.done,
    };
  }
}

export class Task {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.title
   * @param {number} [params.createdAt]
   * @param {Subtask[]} [params.subtasks]
   */
  constructor({ id, title, createdAt = Date.now(), subtasks = [] }) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.subtasks = subtasks.map((subtask) => new Subtask(subtask));
  }

  getCompletedCount() {
    return this.subtasks.filter((subtask) => subtask.done).length;
  }

  getTotalCount() {
    return this.subtasks.length;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      subtasks: this.subtasks.map((subtask) => subtask.toJSON()),
    };
  }
}
