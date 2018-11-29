using System;

namespace AngularIntroduction.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string DateOfBirth { get; set; }

        public User() { }

        public User(int id, string name, string firstName, string email, string dateOfBirth)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
            Email = email ?? throw new ArgumentNullException(nameof(email));
            DateOfBirth = dateOfBirth ?? throw new ArgumentNullException(nameof(dateOfBirth));
        }
    }
}
