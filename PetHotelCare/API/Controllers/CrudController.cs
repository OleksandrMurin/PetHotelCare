using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHotelCare.API.Models;
using PetHotelCare.API.Requests;
using PetHotelCare.DataAccess.Entities;
using System.Linq.Expressions;

namespace PetHotelCare.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Route(Routes.CrudRoute)]
    public abstract class CrudController<TRequest, TModel, TEntity> : ControllerBase
        where TRequest : class
        where TModel : class
        where TEntity : Entity
    {
        private readonly DataAccess.ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CrudController(DataAccess.ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public virtual async Task<ActionResult<TModel>> Add(TRequest model)
        {

            var entity = model.Adapt<TEntity>();
            await _context.AddAsync(entity);

            await _context.SaveChangesAsync();

            return _mapper.From(entity).EntityFromContext(_context).AdaptToType<TModel>();
        }

        

        [HttpDelete]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.FindAsync<TEntity>(id);
            if (entity is null)
                return NotFound();
            _context.Remove(entity);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public virtual async Task<IActionResult> Edit(int id, [FromBody] TRequest request)
        {
                var entity = request.Adapt<TEntity>();
                entity.Id = id;
                _context.Update(entity);

                await _context.SaveChangesAsync();
                return Ok();
        }

        [HttpGet("getById")]
        [AllowAnonymous]
        public async Task<ActionResult<TModel>> GetById(int id)
        {
            var entity = await _context.FindAsync<TEntity>(id);
            if (entity is null)
                return NotFound();
            return entity.Adapt<TModel>();
        }

        protected async Task<PaginationModel<TModel>> GetAsync(int page,
                                            Expression<Func<TEntity, bool>> predicate,
                                            List<Expression<Func<TEntity, object>>> keySelectors,
                                            bool isDesc = false)
        {
            var query = _context.Set<TEntity>().Where(predicate);
            if (keySelectors.Count > 0)
            {
                var queryOrdered = isDesc ? query.OrderByDescending(keySelectors[0]) : query.OrderBy(keySelectors[0]);
                if (keySelectors.Count == 0)
                    throw new ArgumentException(string.Empty, nameof(keySelectors));
                if (keySelectors.Count > 1)
                {
                    foreach (var selector in keySelectors)
                        queryOrdered = isDesc ? queryOrdered.ThenByDescending(selector) : queryOrdered.ThenBy(selector);
                }
                query = queryOrdered;
            }
            var entities = await query.Skip((page - 1) * 10).Take(10).ToListAsync();
            var models = entities.Adapt<List<TModel>>();
            return new PaginationModel<TModel>(models, query.Count());
        }
    
    }
}
