using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace AngularIntroduction.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public IActionResult Get() => Ok(DataSet.Users);

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = DataSet.Users.FirstOrDefault(u => u.Id == id);
            return (user == null ? NotFound() as IActionResult : Ok(user));
        }

    }
}
