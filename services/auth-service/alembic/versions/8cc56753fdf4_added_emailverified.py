"""added emailverified

Revision ID: 8cc56753fdf4
Revises: 2405b9169087
Create Date: 2026-01-06 16:00:06.507392

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "8cc56753fdf4"
down_revision: Union[str, Sequence[str], None] = "2405b9169087"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "emailVerified", sa.Boolean(), server_default=sa.false(), nullable=False
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
